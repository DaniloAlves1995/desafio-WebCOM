import React, { useState, useEffect } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const alertBox = (type, menssage) => {

    const [alert, setAlert] = useState(null);
    const [teste, setteste] = useState(null);

    var hideAlert = () => {
        setAlert(null);
    }

    useEffect(() => {
       console.log(type.type);
       
        if(type.type === "alert-danger"){
            setAlert(<SweetAlert
                warning
                onConfirm={hideAlert}
                onCancel={hideAlert}
                title="Erro!"    
            >
                Usuário ou senha incorretos!
            </SweetAlert>);
        }else{
            setAlert(<SweetAlert
                sucess
                onConfirm={hideAlert}
                onCancel={hideAlert}
                title="Success!"    
            >
                Cadastrado com sucesso!
            </SweetAlert>);
        }
        
    }, [teste]);

    return (
    <div>{alert}</div>
    );
    

}

export default alertBox;