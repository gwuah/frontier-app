import {getFileExtension, generateFileName} from "../app/common/utils"

describe("Webhook", () => {
  it("tests that getFileExtension works properly", async done => {
      const fileUrl = "https://frontier-public-assets.s3-us-west-2.amazonaws.com/05oo7evmr4hsc7ufvmdcpojlh1ki1rd3benjo0g1_Brian_CV.docx"
      expect(getFileExtension(fileUrl)).toEqual("docx")
  });
});