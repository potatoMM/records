new Vue({
  el: "#app",
  data: {
    // 结果
    equation: "0",
    // 判断是否已经输入过小数点（防止在一组数字中间输入超过一个小数点）
    isDecimalAdded: false,
    // 判断之前是否已经点击过 加、减、乘、除
    isOperatorAdded: false,
    //判断是否已经开始输入数字(用于正负数和百分比计算时的判断)
    isStarted: false,
  },
  methods: {
    /**
     * 判断键入的是否为（+、-、×、÷）
     * */
    isOperator(character) {
      return ["+", "-", "×", "÷"].includes(character);
    },
    /***
     * 键入值为 加减乘除及数字或小数点的时候
     */
    append(character) {
      if (this.equation === "0" && !this.isOperator(character)) {
        // 输入是否为小数位符号
        if (character === ".") {
          this.equation += "" + character;
          this.isDecimalAdded = true;
        } else {
          this.equation = "" + character;
        }
        this.isStarted = true;
        return;
      }
      // 输入值为 非 运算符（数字+小数点） 时
      if (!this.isOperator(character)) {
        // 输入值为"." 且 已经输入过小数点 则跳出不作处理
        if (character === "." && this.isDecimalAdded) {
          return;
        }
        if (character === ".") {
          this.isDecimalAdded = true;
          // 避免输入小数点后直接输入运算符号
          this.isOperatorAdded = true;
        } else {
          this.isOperatorAdded = false;
        }
        this.equation += "" + character;
      }
      // 输入值 为运算符
      if (this.isOperator(character) && !this.isOperatorAdded) {
        this.equation += "" + character;
        this.isDecimalAdded = false;
        this.isOperatorAdded = true;
      }
    },
    /***
     * 键入值为 " = "
     */
    calculate() {
      // 将 运算符 替换成可执行的
      let result = this.equation
        .replace(new RegExp("×", "g"), "*")
        .replace(new RegExp("÷", "g"), "/");
      // 将余数后多余的0去掉
      this.equation = parseFloat(eval(result).toFixed(9)).toString();
      this.isOperatorAdded = false;
      // 如果计算结果有小数点不可以继续添加小数点
      this.isDecimalAdded = this.equation.indexOf(".") !== -1 ? true : false;
    },

    /***
     * 键入值为正负号
     */
    calculateToggle() {
      // 刚输入过运算符号或没有开始使用计算器
      if (this.isOperatorAdded || !this.isStarted) {
        return;
      }
      this.equation = this.equation + "* -1";
      this.calculate();
    },
    /***
     * 点击百分比
     */
    calculatePercentage() {
      // 刚输入过运算符号或没有开始使用计算器
      if (this.isOperatorAdded || !this.isStarted) {
        return;
      }
      this.equation = this.equation + "* 0.01";
      this.calculate();
    },
    /**
     * 点击AC
     */
    clear() {
      // 将数据复原
      this.equation = "0",
      this.isDecimalAdded = false,
      this.isOperatorAdded = false,
      this.isStarted = false
    }
  },
});
