import Batch from './Batch';

class ProjectVaxx {

    fetchDB = async(path) => {
        const res =  await fetch('http://localhost:5000/' + path);
        const data = await res.json();
        return data;
    }

    getVaccines = async() => await this.fetchDB('vaccines');

    findVaccine = async(vaccineID) => await this.fetchDB('vaccines/?vaccineID=' + vaccineID);

    getBatches = async() => {
       const batchData = await this.fetchDB('batches');
       const batches = batchData.map(data => new Batch(data)); //convert to actual batch object
       return batches;
    }

    // fetchVaccinationOfBatch(batch) = () => {
    //     fetchVaccination

    // }
      
    findBatch = async(batchNo) => await this.fetchDB('batches/?batchNo=' + batchNo);

    fetchVaccinations = async() => {        
        return await this.fetchDB('vaccination');
    }


}

export default ProjectVaxx;