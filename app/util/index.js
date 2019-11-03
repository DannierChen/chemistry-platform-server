const CONSTANS = require('../constants');

const getTermInfo = (termId, chapterId) => {
  const TERM_LIST = CONSTANS.TERM_LIST;

  const ret = {};

  for (let i = 0; i < TERM_LIST.length; i++) {
    const termInfo = TERM_LIST[i];

    if (termInfo.value == termId) {
      ret.termName = termInfo.label;

      for (let j = 0; j < termInfo.children.length; j++) {
        const chapterInfo = termInfo.children[j];

        if (chapterInfo.value == chapterId) {
          ret.chapterName = chapterInfo.label;
          break;
        }
      }
      break;
    }
  }

  return ret;
}


module.exports = {
  getTermInfo
}