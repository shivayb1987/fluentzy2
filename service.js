import axios from 'axios'
const invokeService = (requestData) => {
    return new Promise((resolve, reject) => {
        axios.get('public/data/' + requestData + '.json')
            .then(response => {
              resolve(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    })
}

export default invokeService
