import getData from "./dom.js";

const API = "https://651d665244e393af2d59b3c1.mockapi.io/todoapi"

// getData
async function get() {
    try {
        let { data } = await axios.get(API);
        getData(data);
    } catch (error) {
        console.log(error);
    }
}

// delete
async function deleteUser(id) {
    try {
        let { data } = await axios.delete(`${API}/${id}`)
        get()
    } catch (error) {
        console.log(error);
    }
}

export { deleteUser };
export default get;