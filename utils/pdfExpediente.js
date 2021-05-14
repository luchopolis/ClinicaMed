class pdfExpediente {
    Nombre;
    TipoSangre;

    getExpediente(){
        let expediente = {
            content: [
                {
                    image:'public/images/logoExpediente.png',
                    width:300,
                    height:110,
                    style:'imgHeader'
                    
                },
                {
                 text:'Expediente del paciente',
                 style:"clinica",
                 margin: [ 0, 20, 10, 10 ] 
                    
                },
                {
                    text:`Nombre del paciente`,
                    style:"titleStyle",
                    margin: [ 0, 10, 0, 10 ] 
                },
                {
                    text:`${this.Nombre}`,
                    style:"contentStyle",
                    margin: [ 0, 0, 0, 0 ] 
                },
                {
                    text:'Tipo de sangre',
                    style:"titleStyle",
                    margin: [ 0, 15, 0, 10 ] 
                },
                {
                    text:`${this.TipoSangre}`,
                    style:"contentStyle",
                    margin: [ 0, 0, 0, 0 ] 
                },
                {
                    text:'Padecimientos y Alergias del paciente',
                    style:"titleStyle",
                    margin: [ 0, 15, 0, 10 ] 
                },
                {
                    style: 'tableExample',
                    table: {
                        widths: [200,200],
                        body: [
                            ['Padecimientos', 'Alergias'],
                            [
                                {
                                    stack: [
                                        {
                                            ul: [
                                                'item 1',
                                                'item 2'
                                            ]
                                        }
                                    ]
                                }, 
                                {
                                    stack: [
                                        {
                                            ul: [
                                                'item 1',
                                                'item 2'
                                            ]
                                        }
                                    ]
                                }
                            ]
                        ],
                        
                    },
                    margin: [ 0, 10, 0, 0 ] 
                }
            ],
            styles:{
                titleStyle:{
                    fontSize:17,
                    bold:true,
                    color:'blue'
                },
                contentStyle:{
                   fontSize:16
                },
                clinica:{
                    fontSize:25,
                    alignment:'center'
                    
                },
                imgHeader:{
                    alignment:'center'
                },
                tableExample:{
                    alignment:'center'
                }
            }
            
            
        }

        return expediente;
    }
}


module.exports = pdfExpediente