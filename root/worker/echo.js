globalThis.addEventListener("message", ({data})=>{
    console.log(`Worker: ${data}`);
    globalThis.postMessage(data);
});