function getFile(e){
    var fileItem;
    var fileName;
    fileItem=e.target.files[0];
    fileName=fileItem.name;
    console.log(fileName);
}

