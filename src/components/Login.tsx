import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const { login } = useAuth();

    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const history = useHistory();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setError('');
        setLoading(true);

        let isLoginSuccessful = false;

        try {
            await login(emailRef.current?.value, passwordRef.current?.value);
            isLoginSuccessful = true;
        }
        catch {
            setError('Your email or password is incorrect.');

        }

        setLoading(false);

        if (isLoginSuccessful) {
            history.push('/');
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    { error && <Alert variant="danger">{ error }</Alert>}
                    <Form onSubmit={ handleSubmit }>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button className="w-100" type="submit" disabled={ loading }>Login</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    );
};

export default Login;