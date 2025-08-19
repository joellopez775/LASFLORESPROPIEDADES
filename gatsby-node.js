const fetch = require('node-fetch');

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  const builderId = process.env.BUILDER_ID;
  if(builderId){
    try{
      console.log("BUILDER ID: ",builderId);
      const data = await fetch(`https://api.clasihome.com/rest/builders?builderId=${builderId}`);
      const result = await data.json();
      result.typeId = result.user ? "user" : "office";
      createNode({
        data: JSON.stringify(result),
        id: `example-build-time-data`,
        parent: null,
        children: [],
        internal: {
          type: `Initial`,
          contentDigest: createContentDigest({ data: JSON.stringify(result) }),
        },
      });

    }catch(e){
      console.log("ERROR: ", e);
    }
  }
  else{
    createNode({
      data: false,
      id: `example-build-time-data`,
      parent: null,
      children: [],
      internal: {
        type: `Initial`,
        contentDigest: createContentDigest({ data: false }),
      },
    });
  }
}