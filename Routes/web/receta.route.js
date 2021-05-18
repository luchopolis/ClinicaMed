const pdfMake = require('pdfmake');
const fonts = require('../../utils/loadFonts');
const pdfReceta = require('../../utils/pdfReceta.js');

module.exports = (router) => {

	router.get('/receta/generate',(req,res,next) => {

		let {Medicamentos,duracion} = req.query
		
		let printer = new pdfMake(fonts);
		let receta = new pdfReceta();

		let recetaT = JSON.stringify(receta.templateReceta())
		recetaT = recetaT.replace('{{nombreMedico}}','Luis Caballero')
		let recetaCompleta = recetaT.replace('{{Contenido}}',`${Medicamentos}`);

		res.writeHead(200, 
            {
                'Content-Type':'application/pdf',
                'Content-Disposition':'attachment;filename="receta.pdf"'
                
            }
        );

        let docPdf =  printer.createPdfKitDocument(JSON.parse(recetaCompleta));
        docPdf.pipe(res)
        docPdf.end()

	})
}