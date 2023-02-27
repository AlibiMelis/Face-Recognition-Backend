const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + process.env.CLARIFAI_API_KEY);

const handleApiCall = (req, res) => {
  stub.PostModelOutputs(
    {
      model_id: "face-detection",
      inputs: [
        { data: { image: { url: req.body.imageurl } } },
      ],
    },
    metadata,
    (err, response) => {
      if (err) {
        console.log("Error: " + err);
        return res.status(400).json(err);
      }

      if (response.status.code !== 10000) {
        console.log(
          "Received failed status: " +
            response.status.description +
            "\n" +
            response.status.details
        );
        return res.status(400).json(response.status.description + "\n" + response.status.details);
      }
      console.log("Predicted concepts, with confidence values:");
      for (const c of response.outputs[0].data.concepts) {
        console.log(c.name + ": " + c.value);
      }
      return res.json(response);
    }
  );
  // app.models
  //   .predict(Clarifai.FACE_DETECT_MODEL, req.body.imageurl)
  //   .then((data) => res.json(data))
  //   .catch((err) =>
  //     res.status(400).json("Unable to work with API" + err + req.body.imageurl)
  //   );
};

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("Unable to get entries"));
};

module.exports = { handleImage, handleApiCall };
