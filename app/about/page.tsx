"use client";
import { motion } from "framer-motion";
import Grid from "@/components/ui/grid";

export default function About() {
  return (
    <motion.div className="pt-[88px] pb-10 text-[15px]/[1.6] h-dvh">
      <Grid className="gap-6">
        <motion.div
          className="col-start-1 col-span-5 tablet:col-span-7 laptop:col-start-3 laptop:col-span-6 desktop:col-start-2 desktop:col-span-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p>
            Stan Desjeux est un photographe de nature morte vivant et
            travaillant à Paris. Son activité s’équilibre entre travail
            éditorial, commande publicitaire, et une recherche artistique et
            expérimentale plus personnelle. Son écriture solaire et organique
            invite à une exploration sensorielle du quotidien, dans laquelle
            nature et objets deviennent les protagonistes d’un jeu de formes et
            de matières. Sa démarche sonde les limites du tangible et les
            mystères du quotidien, à la recherche constante d’une brèche dans le
            réel. 
          </p>
        </motion.div>
        <motion.div
          className="col-start-1 col-span-6 laptop:col-start-3 flex flex-col desktop:col-start-2 desktop:col-span-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>Représenté en France par Marie Valat</p>
          <div className="flex">
            <a
              href="https://www.marievalat.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.marievalat.com
            </a>
            <p className="pr-1 pl-1">|</p>
            <a
              href="mailto:contact@marievalat.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              contact@marievalat.com{" "}
            </a>
          </div>
          <a href="tel:+33 6 22 80 25 80">+33 (0)6 22 80 25 80</a>
          <a
            href="https://www.google.com/maps/place/21+Av.+de+Tourville/@48.8538312,2.3078164,20.5z/data=!4m7!3m6!1s0x47e6702657586e6d:0x9be1a279b72f0148!4b1!8m2!3d48.853826!4d2.3080599!16s%2Fg%2F11bw4c1m5r?hl=fr&entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
          >
            21 avenue de Tourville, 75007 Paris
          </a>
        </motion.div>
        <motion.div
          className="col-start-1 col-span-6 laptop:col-start-9 laptop:col-span-3 flex-col flex laptop:row-start-1 pb-[30px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="pb-2">Contact</p>
          <a
            href="mailto:standesjeux@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            standesjeux@gmail.com
          </a>
          <a href="tel:+33 6 06 88 20 20">+33 (0)6 06 88 20 20</a>
          <a
            href="https://www.instagram.com/stan.desjeux/"
            target="_blank"
            rel="noopener noreferrer"
          >
            instagram @stan.desjeux
          </a>
        </motion.div>
      </Grid>
    </motion.div>
  );
}
