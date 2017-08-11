/**
 * action 类型
 */

 export const CHOOSE_TEST_LEVEL = 'CHOOSE_TEST_LEVEL';

 /**
  * action 创建函数
  */

  export function chooseTestLevel(choosedTxts) {
    return {
      type: CHOOSE_TEST_LEVEL,
      carParams: choosedTxts
    }
  }