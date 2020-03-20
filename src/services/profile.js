import axios from "axios";
import { url } from "../global";
import { trackPromise } from "react-promise-tracker";

export function getGini(Q, P, afterFunc) {
  trackPromise(
    axios
      .get(
        `${url}/api/gini?entity=${Q}${P === "" ? "" : "&properties=" + P}`,
        {}
      )
      .then(
        response => {
          afterFunc({success: true, ...response.data});
        },
        error => {
          afterFunc({success: false, ...error});
        }
      )
      .catch(err => {
        afterFunc({success: false, ...err});
      })
  );
}
