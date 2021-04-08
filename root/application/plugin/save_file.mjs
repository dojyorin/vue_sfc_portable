export default function saveFile(data, name){
    const link = document.createElement("a");
    link.href = URL.createObjectURL(data instanceof Blob ? data : new Blob([data]));
    link.download = name;
    link.click();

    URL.revokeObjectURL(link.href);
}