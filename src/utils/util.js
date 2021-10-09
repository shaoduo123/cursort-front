export default  {

  pickType:function (fileType){
    let image = ['jpg','jpeg','png','gif'];
    let video = ['mp4','3gp'];
    let pdf = ['pdf'];
    let excel = ['xsl'];
    let contentType = {
      'image/jpeg':'jpg',
      'image/gif':'gif',
      'image/png':'png',
      'application/x-xls':'excel',
      'application/msword':'word',
      'application/pdf':'pdf',
    }
    let thumb = 'file_';
    // image/jpeg  video/mp4
    if(fileType!=null&&typeof(fileType)!='undefined'&&fileType!=''){
      for(let key in contentType){
        if(fileType == key){
          return thumb+contentType[key]+'.png'
        }
      }
    }

    return thumb+'unkonwn.png'

  }

}
