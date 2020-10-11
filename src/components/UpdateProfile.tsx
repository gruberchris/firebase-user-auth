import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UpdateProfile = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);

    const { currentUser, updateEmail, updatePassword } = useAuth();

    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const history = useHistory();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
            return setError('Passwords do not match');
        }

        const promises = [];

        setLoading(true);
        setError('');

        if (emailRef?.current?.value !== currentUser?.email) {
            promises.push(updateEmail(emailRef?.current?.value));
        }

        if (passwordRef?.current?.value) {
            promises.push(updatePassword(passwordRef?.current?.value));
        }

        Promise.all(promises).then(() => {
            history.push('/');
        }).catch(() => {
            setError('Account update request failed');
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    { error && <Alert variant="danger">{ error }</Alert>}
                    <Form onSubmit={ handleSubmit }>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} defaultValue={ currentUser?.email } required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required placeholder="Leave blank to keep the same" />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required placeholder="Leave blank to keep the same" />
                        </Form.Group>
                        <Button className="w-100" type="submit" disabled={ loading }>Update Profile</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
            </div>
        </>
    );
};

export default UpdateProfile;