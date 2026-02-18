export type Qsear30PrdTraceRow = {
  chk: string;
  testLot: string;
  lotCreateDate: string;
  orderNo: string;
  orderSeq: string;
  batchNo: string;
  prdLotNo: string;
  matrCiCode: string;
  matrCode: string;
  matrName: string;
  judgCode: string;
  strgQty: string;
  pacPdtqty: string;
  pacQty: string;
  hal3Pacqty: string;
  checkUserCmnt: string;
  pacDate: string;
  startTime: string;
  endTime: string;
  wrkCenter: string;
  wrkCenterName: string;
  wrkMan: string;
  remark: string;
  smlPresCode: string;
  pacSeq: string;
  microTestLot: string;
  microTestBarcode: string;
  btraTestResult1: string;
  btraTestResult2: string;
  btraTestResult3: string;
  finalTestResult: string;
  finalTestJudg: string;
  testCi: string;
  wrkOrderDate: string;
  hal3TestLot: string;
};

export type Qsear30PrdTraceSearchParams = {
  cmbAuthprdci?: string | null;  // 권한사업장
};

export type DsAuthPrdCI = {
  code: string;
  codeName: string;
  userDefine0: string;
};

