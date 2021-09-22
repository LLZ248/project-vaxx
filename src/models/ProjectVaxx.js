class ProjectVaxx {

    fetchDB = async(path) => {
        const res =  await fetch('http://localhost:5000/' + path);
        const data = await res.json();
        return data;
    }

    fetchVaccines = async() => await this.fetchDB('vaccines');
      
    findVaccine = async(vaccineID) => await this.fetchDB('vaccines/?vaccineID=' + vaccineID);
}

export default ProjectVaxx;