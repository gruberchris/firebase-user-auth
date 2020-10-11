import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ForgotPassword = () => {
    const emailRef = useRef<HTMLInputElement>(null);

    const { resetPassword } = useAuth();

    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string>('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setSuccess('');
        setError('');
        setLoading(true);

        try {
            await resetPassword(emailRef?.current?.value);
            setSuccess('Your password reset request was sent to your email inbox')
        }
        catch {
            setError('Password reset request failed');
        }

        setLoading(false);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    { error && <Alert variant="danger">{ error }</Alert>}
                    { success && <Alert variant="success">{ success }</Alert>}
                    <Form onSubmit={ handleSubmit }>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button className="w-100" type="submit" disabled={ loading }>Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    );
};

export default ForgotPassword;