const { execSync } = require('child_process');

function addVToVersionNumber(versionNumber) {
  return versionNumber.startsWith('v') ? versionNumber : `v${versionNumber}`;
}

function commitChanges(message) {
  try {
    execSync(`git commit -m '${message}' --no-verify`);
    console.log('Staged files have been commited.');
  } catch (error) {
    if (error.stdout && Buffer.isBuffer(error.stdout)) {
      console.error(error.stdout.toString());
    } else {
      throw error;
    }
  }
}

module.exports = {
  addVToVersionNumber,
  commitChanges,
};
