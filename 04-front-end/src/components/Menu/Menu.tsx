import { useState } from 'react';
import AuthStore from '../../stores/AuthStore';
import MenuVisitor from './MenuVisitor';
import MenuUser from './MenuUser';
export default function Menu(){
    const [ role, setRole ] = useState<"visitor" | "user">(AuthStore.getState().role);

    AuthStore.subscribe(() => {
        setRole(AuthStore.getState().role)
    });

    return (
        <>
            {role === "visitor" && <MenuVisitor />}
            {role === "user" && <MenuUser />}
        </>
    );
}