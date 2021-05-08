class CitasMonth{

    idMedico;
    month;
    year;
    constructor({id_Medico = 0,month = 0,year = 0}){
        this.idMedico = id_Medico;
        this.month = month;
        this.year = year;
    }

    getData(){
        return new Promise((resolve,reject) => {
            $.ajax({
                url: `/api/appointments/Scheduled/${this.idMedico}/${this.month}/${this.year}`,
                success: function (response) {
                    resolve(response)
                    //loader.style.display = "none";
                },
                error:function(){
                    reject([])
                }
            })
        })
    }
    renderTable(response,table){
        if (response.listaPacientes.length === 0) {
            table.innerHTML = `${response.description}`
        } else {
            response.listaPacientes.forEach(cita => {
                table.innerHTML += `<tr>
                                            <td>${cita.paciente[0].Nombres}</td>
                                            <td>${cita.paciente[0].Apellidos}</td>
                                            <td>${cita.fechaFormated}</td>
                                            <td>${cita.Hora}</td>
                                            <td>${cita.Estado}</td>
                                        </tr>`
            })
        }
    }

}