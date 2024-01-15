import { Container } from '@mui/material';
import * as React from 'react';
import { PublicFooter, PublicHeader } from '../components/layout';

export function AboutPage() {
    return (
        <React.Fragment>
            <PublicHeader />

            <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3970960513284!2d106.65123417336673!3d10.78086768936815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec80a1fe825%3A0x8a6f063e38a55a1c!2zMzEgVGjDoG5oIE3hu7ksIFBoxrDhu51uZyA4LCBUw6JuIELDrG5oLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1704654867467!5m2!1sen!2s"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Adress"
                ></iframe>
            </Container>
            <PublicFooter />
        </React.Fragment>
    );
}
