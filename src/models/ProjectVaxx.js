class ProjectVaxx {

    fetchDB = async(path) => {
        const res =  await fetch('http://localhost:5000/' + path);
        const data = await res.json();
        return data;
    }

    fetchVaccines = async() => await this.fetchDB('vaccines');

    findVaccine = async(vaccineID) => await this.fetchDB('vaccines/?vaccineID=' + vaccineID);

    getBatches = async() => await this.fetchDB('batches');
      
    findBatch = async(batchNo) => await this.fetchDB('vaccines/?batchNo=' + batchNo);


}

export default ProjectVaxx;