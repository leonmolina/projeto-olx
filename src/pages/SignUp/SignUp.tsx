// import React, { useState, useEffect } from 'react';
// import './style.css';
// import useApi from '../../helpers/OlxApi';
// import { doLogin } from '../../helpers/AuthHandler';
// import ErrorMessage from '../../components/partials/ErrorMessage';
// import { Form, Button } from 'react-bootstrap';

// const SignUp = () => {
//     const api = useApi();

//     const [name, setName] = useState('');
//     const [stateLoc, setStateLoc] = useState('')
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');

//     const [stateList, setStateList] = useState([]);

//     const [disabled, setDisabled] = useState(false);
//     const [error, setError] = useState('');

//     useEffect(()=>{
//         const getStates = async () => {
//             const slist = await api.getStates();
//             setStateList(slist);
//         }
//         getStates();
//     }, []);

//     const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
//         e.preventDefault();
//         setDisabled(true);

//         const json = await api.login(email, password);

//         // if(json.error) {
//         //     setError(json.error);
//         // } else {
//         //     doLogin(json.token, rememberPassword);
//         //     window.location.href = '/';
//         // }
//         setDisabled(false);
//     }

//     return (
//         <div className="container">
//             <div className="signin-title">
//                 <h3>Cadastro</h3>
//             </div>
//             <div>
//                 {error &&
//                     <ErrorMessage text={error}/>
//                 }
//                 <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-1 area">
//                         <Form.Label className='area-title'>Nome Completo</Form.Label>
//                         <Form.Control 
//                             type="text"
//                             className='area-input'
//                             disabled={disabled}
//                             value={name}
//                             onChange={e=>setName(e.target.value)} 
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-1 area">
//                         <Form.Label className='area-title'>Estado</Form.Label>
//                         <select 
//                             value={stateLoc} 
//                             onChange={e=>setStateLoc(e.target.value)} 
//                             required>
//                             <option></option>
//                             {/* {stateList.map(i=>
//                                 <option value={i._id}>{i.name}</option>
//                             )} */}
//                             {stateList &&
//                                 stateList.map((i, k)=>{
//                                     <option key={k} value={i._id}>{i.name}</option>
//                                 })
//                             }
//                         </select>
//                     </Form.Group>
//                     <Form.Group className="mb-1 area">
//                         <Form.Label className='area-title'>E-mail</Form.Label>
//                         <Form.Control 
//                             type="email"
//                             className='area-input'
//                             disabled={disabled}
//                             value={email}
//                             onChange={e=>setEmail(e.target.value)} 
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-1 area">
//                         <Form.Label className='area-title'>Senha</Form.Label>
//                         <Form.Control
//                             type="password"
//                             className='area-input'
//                             disabled={disabled}
//                             value={password}
//                             onChange={e=>setPassword(e.target.value)}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-1 area">
//                         <Form.Label className='area-title'>Confirmar Senha</Form.Label>
//                         <Form.Control
//                             type="password"
//                             className='area-input'
//                             disabled={disabled}
//                             value={confirmPassword}
//                             onChange={e=>setConfirmPassword(e.target.value)}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-1 area">
//                         <Form.Label className='area-title'></Form.Label>
//                         <Button variant="primary" type="submit" disabled={disabled}>Fazer Cadastro</Button>
//                     </Form.Group>
//                 </Form>
//             </div>
//         </div>
//     );
// }

// // export default SignUp;

export {}