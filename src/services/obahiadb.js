import axios from 'axios';

const odb = axios.create({
    baseURL:`http://obahia.dea.ufv.br`
});

export default odb;