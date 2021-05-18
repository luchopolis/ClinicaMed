class PdfReceta {

	contructor(){

	}

	templateReceta(){
		let template = {
			    pageSize: 'A5',
			    watermark: { text: 'MedCenter', fontSize: 20,color: 'blue', opacity: 0.2, bold: true, italics: false },
			    pageOrientation: 'landscape',
				content: [
				    
					{
					     
					    columns:[
					        {	
					            image: 'public/images/logoReceta.png',
						        width: 100,
						        height:50,
						        margin:[0,10,10,20],
					        },
					        {
					            text:'DR.{{nombreMedico}}',
					            margin:[30,10,20,10],
					            fontSize:20
					        }
					    ]
					},
					{
						text:"{{Contenido}}"
					},
					{
					    margin:[0,200,0,0],
					    text:"------------------------------------"
					},
					{
					    columns:[
					            {
					                
					                text:"Firma del medico"
					            }
					    ]
					}
				]
				
			}

			return template;
	}


}

module.exports = PdfReceta;