import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);

    const { signup } = useAuth();

    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const history = useHistory();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
            return setError('Passwords do not match');
        }

        setError('');
        setLoading(true);

        let isSignUpSuccessful = false;

        try {
            await signup(emailRef.current?.value, passwordRef.current?.value);
            isSignUpSuccessful = true;
        }
        catch {
            setError('Failed to create an account');
        }

        setLoading(false);
        
        if (isSignUpSuccessful) {
            history.push('/');
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
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
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button className="w-100" type="submit" disabled={ loading }>Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </>
    );
};

export default Signup;