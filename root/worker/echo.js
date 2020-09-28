self.addEventListener("message", ({data})=>{
    console.log(`Worker: ${data}`);
    self.postMessage(data);
});