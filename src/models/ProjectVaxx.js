class ProjectVaxx {

    fetchDB = async(path) => {
        const res =  await fetch('http://localhost:3307/' + path);
        const data = await res.json();
        return data;
    }

    fetchVaccines = async() => {
        return await fetchDB('vaccines');
    }
      
    findVaccine(vaccineID) {
        return fetchDB('vaccines/?vaccineID=' = vaccineID);
    }
}

export default ProjectVaxx;