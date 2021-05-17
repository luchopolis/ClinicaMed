class pdfExpediente {
    Nombre;
    TipoSangre;
    Padecimientos;
    Alergias;
    Edad;
    Ocupacion;
    Peso;
    Medicamentos;
    Diagnostico;

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

    asignarMedicamentos(){
        let template = this.templateBodyItems()

        this.Medicamentos.forEach(medicamento => {
            template["stack"][0]["ul"].push(`${medicamento.nombre}`)
        })

        return template;
    }
    getExpediente(){
        let expediente = {
            watermark: { text: 'MedCenter', fontSize: 20,color: 'blue', opacity: 0.3, bold: true, italics: false },
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
                }, {
                    columns:[
                        {
                            text:`Edad`,
                            style:"titleStyle",
                            margin: [ 0, 10, 0, 0 ] 
                        },
                        {
                            text:`Ocupacion`,
                            style:"titleStyle",
                            margin: [ 0, 10, 0, 0 ] 
                        },
                        {
                            text:`Peso(lb)`,
                            style:"titleStyle",
                            margin: [ 0, 10, 0, 0 ] 
                        }

                    ]
                },
                {
                    columns:[
                        {
                            text:`${this.Edad}`,
                            style:"contentStyle",
                        },
                        {
                            text:`${this.Ocupacion}`,
                            style:"contentStyle",
                        },
                        {
                            text:`${this.Peso}`,
                            style:"contentStyle",
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
                },
                {
                    text:'Tratamiento Medico actual',
                    style:"titleStyle",
                    margin: [ 0, 15, 0, 10 ] 
                },
                {
                    style: 'tableExample',
                    table:{
                        widths: [200,200],
                        body: [
                            ['Medicamentos'],
                            [
                                
                            ]
                        ],
                    },
                    margin: [ 0, 10, 0, 0 ] 
                },
                {
                    text:'Diagnostico actual',
                    style:"titleStyle",
                    margin: [ 0, 15, 0, 10 ] 
                },
                {
                    text:`${this.Diagnostico}`,
                    style:"diagnosticoStyle",
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
                },
                diagnosticoStyle:{
                    fontSize:16,
                    alignment:'justify'
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