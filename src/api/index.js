import user from "./user";
import common from "./common";
import home from "./home";
import order from "./order";
import tools from "./tools";

export default {
  ...common,
  ...user,
  ...home,
  ...order,
  ...tools
};
