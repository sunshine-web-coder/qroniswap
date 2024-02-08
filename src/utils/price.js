const getCakePrice = async () => {
  const url =
    "https://deep-index.moralis.io/api/v2/erc20/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/price?chain=bsc";
  try {
    const response = await fetch(url, {
      headers: {
        "X-API-Key":
          "v8lvaPW0IoL7vNfoiwBzXT3q840Kkni5pfC8KIvWp4aa3n6gY4qwVv2y5yNNgtFi",
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("error", error);
  }
};

const getEthPrice = async () => {
  const url =
    "https://deep-index.moralis.io/api/v2/erc20/0x2170Ed0880ac9A755fd29B2688956BD959F933F8/price?chain=bsc";
  try {
    const response = await fetch(url, {
      headers: {
        "X-API-Key":
          "v8lvaPW0IoL7vNfoiwBzXT3q840Kkni5pfC8KIvWp4aa3n6gY4qwVv2y5yNNgtFi",
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("error", error);
  }
};

const getBnbPrice = async () => {
  const url =
    "https://deep-index.moralis.io/api/v2/erc20/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/price?chain=bsc";
  try {
    const response = await fetch(url, {
      headers: {
        "X-API-Key":
          "v8lvaPW0IoL7vNfoiwBzXT3q840Kkni5pfC8KIvWp4aa3n6gY4qwVv2y5yNNgtFi",
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("error", error);
  }
};

const getQniPrice = async () => {
  const url =
    "https://deep-index.moralis.io/api/v2/erc20/0x98343e3eaf0aa8af6e93faff70c8ff70d98862f1/price?chain=bsc";
  try {
    const response = await fetch(url, {
      headers: {
        "X-API-Key":
          "v8lvaPW0IoL7vNfoiwBzXT3q840Kkni5pfC8KIvWp4aa3n6gY4qwVv2y5yNNgtFi",
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("error", error);
  }
};

const getBtcPrice = async () => {
  const url =
    "https://deep-index.moralis.io/api/v2/erc20/0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c/price?chain=bsc";
  try {
    const response = await fetch(url, {
      headers: {
        "X-API-Key":
          "v8lvaPW0IoL7vNfoiwBzXT3q840Kkni5pfC8KIvWp4aa3n6gY4qwVv2y5yNNgtFi",
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("error", error);
  }
};
export { getCakePrice, getEthPrice, getBnbPrice, getQniPrice, getBtcPrice };
