import { checkout } from "./utils/renderCheckout.js";
import { payment } from "./utils/renderPayment.js";
import {isWeekend as isSatSun} from "../dayJs.js";

  checkout();
  payment();
  isSatSun();
