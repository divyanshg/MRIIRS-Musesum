const { createStore } = require("redux");
const { default: dataReducer } = require("./dataReducer");

export default createStore(
    dataReducer
)