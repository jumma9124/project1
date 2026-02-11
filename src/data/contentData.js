/**
 * 전체 금융 용어 콘텐츠 데이터
 *
 * 카테고리별 개별 파일에서 데이터를 가져와 하나로 합칩니다.
 * 기존 import 경로(contentData)를 그대로 사용할 수 있습니다.
 */

import salaryData from './content/salaryData';
import bankingData from './content/bankingData';
import creditData from './content/creditData';
import investmentData from './content/investmentData';
import housingData from './content/housingData';
import economyData from './content/economyData';

const contentData = {
  ...salaryData,
  ...bankingData,
  ...creditData,
  ...investmentData,
  ...housingData,
  ...economyData,
};

export default contentData;
