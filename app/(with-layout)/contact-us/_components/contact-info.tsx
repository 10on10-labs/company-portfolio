'use client';

import { AtSign, Info, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

import { Card, CardContent } from '@/components/shadcn/card';

export function ContactInfo() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <AtSign className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">E-mail us</h3>
              <p className="text-muted-foreground">
                Please send an e-mail to{' '}
                <a href="mailto:contact@10on10labs.com" className="text-primary hover:underline">
                  contact@10on10labs.com
                </a>
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <MapPin className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Find us</h3>
              <div className="text-muted-foreground">
                <p className="font-medium">Succeed Offices</p>
                <p>123 Tech Street</p>
                <p>10001 — New York, USA</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Info className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Info</h3>
              <div className="text-muted-foreground">
                <p>Chamber of Commerce: 80195520</p>
                <p>VAT: NL861584594B01</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
