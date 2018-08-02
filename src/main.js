// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import moment from "moment";
Vue.config.productionTip = false;
export const purposes = [
  {
    label: "Salary Disbursement",
    config: "CA_SALARY_DISBURSEMENT$"
  },
  {
    label: "Reimbursement",
    config: "CA_REIMBURSEMENT$"
  },
  {
    value: "CA_INCENTIVE",
    label: "Incentive"
  },
  {
    value: "CA_BONUS",
    label: "Bonus"
  },
  {
    value: "CA_FUND_TRANSFER",
    label: "Others"
  }
];

const getPurposes = (dateLimit = 3) => {
  const newPurPoses = purposes.map(purpose => {
    if (purpose.config) {
      let children = [];
      for (let i = 1; i <= dateLimit; i++) {
        children.push({
          label: moment()
            .subtract(i, "months")
            .format("MMM-YYYY"),
          value: `${purpose.config}${moment()
            .subtract(i, "months")
            .format("MMM YYYY")}`
        });
        delete purpose.config;
      }
      return {
        ...purpose,
        children
      };
    } else {
      return {
        ...purpose
      };
    }
  });
  return newPurPoses;
};

console.log(getPurposes());

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
