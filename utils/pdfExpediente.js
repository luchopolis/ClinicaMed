class pdfExpediente {
    Nombre;
    TipoSangre;
    Padecimientos;
    Alergias;

    actualDay;

    constructor(){
        let date = new Date()

        let dd = date.getDate();
        let mm = date.getMonth()+1;
        let aaaa = date.getFullYear()


        this.actualDay = `${aaaa}-${mm}-${dd}`;
    }

    asignarPadecimientos(){
        let template = this.templateBodyItems()
        
        this.Padecimientos.forEach(padecimiento => {

            template["stack"][0]["ul"].push(`${padecimiento}`)
        })

        return template;
    }

    asignarAlergias(){
        let template = this.templateBodyItems()

        this.Alergias.forEach(alergia => {
            template["stack"][0]["ul"].push(`${alergia}`)
        })

        return template;
    }

    getExpediente(){
        let expediente = {
            content: [
                
                {
                    image:'public/images/logoExpediente.png',
                    width:300,
                    height:110,
                    style:'imgHeader',
                    fit: [100, 100]
                    
                },
                {
                    text:`Fecha de emision: ${this.actualDay}`
                },
                {
                 text:'Expediente del paciente',
                 style:"clinica",
                 margin: [ 0, 20, 10, 10 ] 
                },
                {
                    columns:[
                        {
                            text:`Nombre del paciente`,
                            style:"titleStyle",
                            margin: [ 0, 10, 0, 10 ] 
                        },
                        {
                            text:'Tipo de sangre',
                            style:"titleStyle",
                            margin: [ 0, 15, 0, 10 ] 
                        }
                    ]
                },
                {
                    columns:[
                        
                        {
                            text:`${this.Nombre}`,
                            style:"contentStyle",
                            margin: [ 0, 0, 0, 0 ] 
                        },
                        {
                            text:`${this.TipoSangre}`,
                            style:"contentStyle",
                            margin: [ 0, 0, 0, 0 ] 
                        }
                    ]
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
                            ['Padecimientos','Alergias'],
                            [
                                
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

    templateBodyItems(){
        return {
            stack: [
                {
                    ul: []
                }
            ]
        }
    }
}


module.exports = pdfExpediente