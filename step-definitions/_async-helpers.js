// Make it possible to see if async methods throws by calling
// expect(await object.methodThatMightThrow.throwCheck).to.throw(...)
Object.defineProperty(Promise.prototype, 'throwCheck', {
  get: async function () {
    let error;
    await this.catch(e => error = e);
    return error ? () => { throw error } : () => { }
  }
});

// Remove annoying "NoSuchWindowError" that phantom.js might otherwise 
// throw if we use async steps (when not using the Selenium part of 
// selenium - cucumber.js, i.e. just using the module for unit testing)
global.fixNoSuchWindowError = driver => {
  driver.close = () => {
    return { then: () => new Promise(res => res()) }
  }
  return () => { };
};