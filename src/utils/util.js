export default  {

  pickType:function (fileType){
    let image = ['jpg','jpeg','png','gif'];
    let video = ['mp4','3gp'];
    let pdf = ['pdf'];
    let excel = ['xsl'];
    let contentType = {
      'image/jpeg':'jpeg',
      'image/gif':'gif',
      'image/png':'png',
      'video/mpeg4':'mp4',
    }
    let thumb = '../assets/file_';
    // image/jpeg  video/mp4
    if(fileType!=null&&typeof(fileType)!='undefined'&&fileType!=''){
      for(let key in contentType){
        if(fileType == key){
          return thumb+contentType[key]+'.png'
        }
      }
    }

    return thumb+'file_unkonwn.png'

  }

}
