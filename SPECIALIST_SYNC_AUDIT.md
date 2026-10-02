# Specialist page sync audit

Source of truth: the live site, https://gramyhospital.com/ (captured 2026-10-02).

Every specialist / condition / diagnostic inner page in this project was compared with its live page and re-synced. The page content now comes from `data/specialist-live.json`, generated from the live Elementor markup of each page.

## Summary

- Pages checked: 47 (14 specialist pages + 33 condition / diagnostic pages).
- Pages whose text differed from live: 16.
- Pages whose article images differed from live: 42.
- Pages whose doctor section differed from live: 30.
- Pages with a photo banner on live: 36; without: 11.
- Pages with the sidebar on the left on live: microbiology, bariatric-surgery, cardiac-sciences, coronary-artery-bypass-grafting-cabg, eye-care-ophthalmology, lung-transplant, neuro-sciences, robotic-heart-surgery, the-da-vinci-xi-robotic-system, valvular-heart-surgery.
- Pages with no question form on live: gynecology.
- Images that are broken (404) on the live site itself, so nothing is shown there: 2024/09/Gynecology.jpg, 2026/03/bariatric-surgery.png, 2026/04/Coronary-Artery-Bypass-Surgery-Procedure.avif, 2026/03/Eye-Checkup.jpg, 2026/04/Lung-Transplantation.webp, 2026/04/Robotic-Heart-Surgery.avif, 2026/04/The-Da-Vinci-Xi-Robotic-System.jpg, 2026/04/Valvular-Heart-Surgery.jpg.

## Per page

Text columns count headings, paragraphs and list items that were added / removed against the previous local copy.

| Page | Local route | Banner image | Text + / − | Article images (was → now) | Doctors (was → now) | Doctor section on live | Sidebar items |
|---|---|---|---|---|---|---|---|
| cosmetic-gynaecology | /cosmetic-gynaecology , /specialists/cosmetic-gynaecology | image_68b4c8c7.jpg | +0 / −0 | image_963a07ea-e1787722915496-1024x656.png → image_963a07ea-e1787722915496-1024x656.png | 1 → 1 | carousel | 8 |
| cosmetic-surgery | /cosmetic-surgery , /specialists/cosmetic-surgery | image_dae81f42-1.jpg | +1 / −0 | newimg41-1024x473.jpeg → newimg41-1024x473.jpeg | 3 → 3 | carousel (loop) | 5 |
| ent-surgery | /ent-surgery , /specialists/ent-surgery | image_73f5ab19.jpg | +4 / −4 | newimg17-1024x473.jpeg → newimg17-1024x473.jpeg, ENT-Surgery-612x518.jpeg | 3 → 3 | carousel (loop) | 5 |
| general-surgery | /general-surgery , /specialists/general-surgery | image_ba0f4631.jpg | +1 / −0 | newimg7.jpeg → newimg38.jpeg, newimg7.jpeg | 3 → 3 | carousel | 5 |
| robotic-surgery | /robotic-surgery , /specialists/robotic-surgery | image_6d22357c.jpg | +0 / −0 | LSUK8424.jpg → LSUK8424-1024x683.jpg | 4 → 11 (changed) | static grid | 5 |
| gynecology | /gynecology , /specialists/gynecology | image_24a73ee2.jpg | +1 / −0 | Gynecology.jpg → Gynaec-819x1024.jpeg, Gynecology.jpg | 2 → 2 | carousel | 8 |
| orthopedic-surgery | /orthopedic-surgery , /specialists/orthopedic-surgery | image_e2d94d71.jpg | +0 / −0 | newimg77.jpeg → newimg77.jpeg, Orthopedic-Surgery-612x518.jpeg, Orthopedics-612x518.jpg | 6 → 6 (changed) | static grid | 5 |
| neurology | /neurology , /specialists/neurology | image_1adea37e-1.jpg | +0 / −8 | Cosmetic-Surgery.webp → Neurology-612x518.jpeg, Neurosurgery-612x518.jpg | 1 → 1 | carousel | 5 |
| aesthetic-medicine | /aesthetic-medicine , /specialists/aesthetic-medicine | image_99e1cf60.jpg | +2 / −2 | Gynecology.jpg → Aesthetic-Medicine-1024x683.jpeg | 1 → 2 (changed) | carousel | 5 |
| prp-cartilage-rejuvenation | /prp-cartilage-rejuvenation , /specialists/prp-cartilage-rejuvenation | image_d8a97538.jpg | +1 / −1 | Gynecology.jpg → (broken on live) | 1 → 2 (changed) | carousel | 5 |
| neurosurgery | /neurosurgery , /specialists/neurosurgery | image_84400b53.jpg | +0 / −0 | Neurosurgery.jpg → Neurosurgery-612x518.jpg, Neuro-Surgery-612x518.jpeg, Neurology-612x518.jpeg | 2 → 3 (changed) | carousel | 5 |
| plastic-surgery | /plastic-surgery , /specialists/plastic-surgery | image_fc32aa2.jpg | +0 / −0 | IMG-20260729-WA0021.jpg → IMG-20260729-WA0021.jpg, Plastic-Surgery-612x518.jpeg | 3 → 3 | carousel | 5 |
| urology | /urology , /specialists/urology | image_96a389ea.jpg | +0 / −0 | Robotic-Heart-Surgery.avif → Urology-612x518.jpeg, nephrologist-612x415.jpg | 2 → 3 (changed) | carousel | 5 |
| anti-ageing-nutrition-medicine | /anti-ageing-nutrition-medicine , /specialists/anti-ageing-nutrition-medicine | image_6db4e1bf.jpg | +2 / −1 | Antiaging-and-Wellness-1.jpg → none | 1 → 1 | carousel | 5 |
| radiology | /services/radiology | image_9d427a39.jpg | +0 / −0 | services-details.jpg → radiology2.webp, xray-pns.png | 4 → 0 (changed) | none (hidden on live) | 8 |
| sonography | /services/sonography | image_6ca97f3f.jpg | +0 / −0 | services-details.jpg → Sonography.webp, sonograph-2.jpg | 4 → 0 (changed) | none (hidden on live) | 8 |
| microbiology | /services/microbiology | bg23.jpg | +0 / −4 | services-details.jpg → services-details.jpg | 4 → 4 (changed) | carousel | 8 (left) |
| orthopedics | /orthopedics | image_6851ecc8.jpg | +0 / −0 | Orthopedics.jpg → Orthopedics.jpg, orthopedic-surgery-612x518.jpg | 5 → 6 (changed) | carousel (loop) | 5 |
| pathology | /services/pathology | image_2788a611.jpg | +0 / −0 | Gramy-Hospita-172-612x518.jpg → Gramy-Hospita-172-612x518.jpg, Pathology-612x518.webp | 4 → 0 (changed) | none (hidden on live) | 4 |
| antiaging-and-wellness | /antiaging-and-wellness | image_e4d63159.jpg | +0 / −0 | none → Antiaging-and-Wellness-1.jpg, Antiaging-and-Wellness-1024x426.jpg | 1 → 1 | carousel | 5 |
| bariatric-surgery | /bariatric-surgery | none (box only) | +5 / −5 | none → (broken on live) | 4 → 4 (changed) | carousel | 5 (left) |
| bariatric-weight-loss-surgery | /bariatric-weight-loss-surgery | image_c76c7fa.jpg | +6 / −5 | none → bariatric-surgery.png, laparoscopic-gramy-e1790773603587.webp | 4 → 0 (changed) | none (hidden on live) | 5 |
| bone-marrow-transplant | /bone-marrow-transplant | image_ba0f4631.jpg | +2 / −0 | none → bone-marror.jpg, newimg75-612x518.jpeg | 2 → 3 (changed) | carousel | 5 |
| cancer-care-oncology | /cancer-care-oncology | image_8f61666d.jpg | +2 / −0 | none → newimg25-1024x473.jpeg, Onco-Surgery-1024x574.jpg | 1 → 2 (changed) | carousel | 5 |
| cancer-surgery | /cancer-surgery | image_8f61666d.jpg | +0 / −0 | none → newimg69-1024x473.jpeg, Onco-Surgery-1024x574.jpg | 2 → 2 | carousel | 5 |
| car-t-cell-therapy | /car-t-cell-therapy | image_d1822fe2.jpg | +0 / −1 | none → image_b02010a7-e1790775882699-1024x497.jpg | 4 → 0 (changed) | none (hidden on live) | 5 |
| cardiac-sciences | /cardiac-sciences | none (box only) | +0 / −0 | none → none | 4 → 4 (changed) | carousel | 5 (left) |
| chemotherapy | /chemotherapy | image_8f61666d.jpg | +0 / −0 | none → Chemotherapy.webp | 1 → 1 | carousel | 5 |
| cochlear-implant | /cochlear-implant | image_40ff79fb.jpg | +0 / −0 | none → image_5388df10-1024x572.jpg | 4 → 0 (changed) | none (hidden on live) | 5 |
| coronary-artery-bypass-grafting-cabg | /coronary-artery-bypass-grafting-cabg | none (box only) | +0 / −0 | none → (broken on live) | 4 → 0 (changed) | none (hidden on live) | 5 (left) |
| ecmo | /ecmo | image_65422bc5.jpg | +0 / −0 | none → ECMO.webp | 4 → 0 (changed) | none (hidden on live) | 5 |
| endoscopy-spine | /endoscopy-spine | none (box only) | +0 / −0 | newimg68.jpeg → newimg68.jpeg | 2 → 2 | carousel | 5 |
| ent | /ent | none (box only) | +0 / −0 | ENT-Ear-Nose-Throat-1024x1000-1.jpg → ENT-Ear-Nose-Throat-1024x1000-1.jpg | 2 → 2 | carousel | 5 |
| eye-care-ophthalmology | /eye-care-ophthalmology | none (box only) | +0 / −0 | none → (broken on live) | 1 → 1 | carousel | 5 (left) |
| hipec | /hipec | image_fd5a4668.jpg | +0 / −0 | none → HIPEC.webp, newimg1-1024x473.jpeg | 4 → 0 (changed) | none (hidden on live) | 5 |
| kidney-transplant | /kidney-transplant | image_96a389ea.jpg | +0 / −0 | Urology-1.jpg → nephrologist.jpg, Urology-612x518.jpeg | 4 → 0 (changed) | none (hidden on live) | 5 |
| knee-replacement-surgery | /knee-replacement-surgery | image_e2d94d71.jpg | +0 / −1 | none → knee-replacement.jpg | 1 → 1 | carousel | 5 |
| lung-transplant | /lung-transplant | none (box only) | +0 / −0 | none → (broken on live) | 4 → 0 (changed) | none (hidden on live) | 5 (left) |
| lvad | /lvad | image_e3d2e0d3.jpg | +0 / −0 | none → LVAD.webp | 4 → 0 (changed) | none (hidden on live) | 5 |
| minimal-access-laparoscopic-surgery | /minimal-access-laparoscopic-surgery | image_6fed632a.jpg | +0 / −0 | none → laparoscopic-gramy-e1790773603587.webp, newimg63.jpeg | 1 → 1 | carousel | 5 |
| nephrology | /nephrology | image_4de6ff3b-1.jpg | +0 / −0 | none → Nephrology-e1790772781900-768x495.jpg, nephrologist.jpg | 1 → 0 (changed) | none (hidden on live) | 5 |
| neuro-sciences | /neuro-sciences | none (box only) | +0 / −0 | none → none | 4 → 4 (changed) | carousel | 5 (left) |
| pain-management | /pain-management | image_d4a5c34f.jpg | +0 / −0 | none → Pain-Management-1024x518.jpeg | 1 → 2 (changed) | carousel | 5 |
| robotic-heart-surgery | /robotic-heart-surgery | none (box only) | +0 / −0 | none → (broken on live) | 4 → 0 (changed) | none (hidden on live) | 5 (left) |
| robotic-replacement-surgeries | /robotic-replacement-surgeries | image_be7e09cf.jpg | +1 / −0 | none → Robotic-Heart-Surgery.avif, robotic-surgery-1024x722.webp | 3 → 3 | carousel (loop) | 5 |
| the-da-vinci-xi-robotic-system | /the-da-vinci-xi-robotic-system | none (box only) | +0 / −0 | none → (broken on live) | 4 → 0 (changed) | none (hidden on live) | 5 (left) |
| valvular-heart-surgery | /valvular-heart-surgery | none (box only) | +0 / −0 | none → (broken on live) | 4 → 0 (changed) | none (hidden on live) | 5 (left) |

## Doctor section changes

- **robotic-surgery**: was Dr. Waqar Ahmed Ansari; Dr. Naushad Hussain; Dr. Maqsood Ali Khan; Dr. Jamal Akhtar Azmi → now Dr. Waqar Ahmed Ansari; Dr. Naushad Hussain; Dr. Maqsood Ali Khan; Dr. Jamal Akhtar Azmi; Dr. Sadique Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Aleem Siddiqui; Dr. Fayaz W. Memon; Dr. Ishtiyaque Khan; Dr. Ghulam Muqtada Khan; Dr. Turabi Mazhar Abbas.
- **orthopedic-surgery**: was Dr. Aleem Siddiqui; Dr. Fayaz W. Memon; Dr. Ishtiyaque Khan; Dr. Naushad Hussain; Dr. Sadique Ahmad Khan; Dr. Waseem M.R. Siddiqui → now Dr. Sadique Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Aleem Siddiqui; Dr. Fayaz W. Memon; Dr. Ishtiyaque Khan; Dr. Naushad Hussain.
- **aesthetic-medicine**: was Dr. Rafat Ali Khan → now Dr. Vrushali Rane Khan; Dr Nasreen Aleem Siddiqui.
- **prp-cartilage-rejuvenation**: was Dr. Waseem M.R. Siddiqui → now Dr. Ghulam Muqtada Khan; Dr. Aleem Siddiqui.
- **neurosurgery**: was Dr. Ghulam Muqtada Khan; Dr. Turabi Mazhar Abbas → now Dr. Ghulam Muqtada Khan; Dr. Nakul Rathore; Dr. Turabi Mazhar Abbas.
- **urology**: was Dr. Zaffar Karam Sayed; Dr. Jamal Akhtar Azmi → now Dr. Zaffar Karam Sayed; Dr. Mohd Hamid Shafique Ahmed; Dr. Jamal Akhtar Azmi.
- **radiology**: was Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Waqar Ahmed Ansari → now no doctor section (hidden on live).
- **sonography**: was Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Waqar Ahmed Ansari → now no doctor section (hidden on live).
- **microbiology**: was Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Varsha Patil → now Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Waqar Ahmed Ansari.
- **orthopedics**: was Dr. Aleem Siddiqui; Dr. Ishtiyaque Khan; Dr. Naushad Hussain; Dr. Sadique Ahmad Khan; Dr. Waseem M.R. Siddiqui → now Dr. Aleem Siddiqui; Dr. Fayaz W. Memon; Dr. Ishtiyaque Khan; Dr. Naushad Hussain; Dr. Sadique Ahmad Khan; Dr. Waseem M.R. Siddiqui.
- **pathology**: was Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Waqar Ahmed Ansari → now no doctor section (hidden on live).
- **bariatric-surgery**: was Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Varsha Patil → now Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Waqar Ahmed Ansari.
- **bariatric-weight-loss-surgery**: was Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Varsha Patil → now no doctor section (hidden on live).
- **bone-marrow-transplant**: was Dr. Ghulam Muqtada Khan; Dr. Turabi Mazhar Abbas → now Dr. Ghulam Muqtada Khan; Dr. Nakul Rathore; Dr. Turabi Mazhar Abbas.
- **cancer-care-oncology**: was Dr. Khan Mohd Aizaz → now Dr. Maqsood Ali Khan; Dr. Khan Mohd Aizaz.
- **car-t-cell-therapy**: was Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Varsha Patil → now no doctor section (hidden on live).
- **cardiac-sciences**: was Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Varsha Patil → now Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Waqar Ahmed Ansari.
- **cochlear-implant**: was Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Varsha Patil → now no doctor section (hidden on live).
- **coronary-artery-bypass-grafting-cabg**: was Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Varsha Patil → now no doctor section (hidden on live).
- **ecmo**: was Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Varsha Patil → now no doctor section (hidden on live).
- **hipec**: was Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Varsha Patil → now no doctor section (hidden on live).
- **kidney-transplant**: was Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Varsha Patil → now no doctor section (hidden on live).
- **lung-transplant**: was Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Varsha Patil → now no doctor section (hidden on live).
- **lvad**: was Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Varsha Patil → now no doctor section (hidden on live).
- **nephrology**: was Dr. Raza Abdulrehman Modak → now no doctor section (hidden on live).
- **neuro-sciences**: was Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Varsha Patil → now Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Waqar Ahmed Ansari.
- **pain-management**: was Dr. Yasir Ahmad Khan → now Dr. Yasir Ahmad Khan; Dr. Rafique Ullah Khan.
- **robotic-heart-surgery**: was Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Varsha Patil → now no doctor section (hidden on live).
- **the-da-vinci-xi-robotic-system**: was Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Varsha Patil → now no doctor section (hidden on live).
- **valvular-heart-surgery**: was Dr. Zaffar Karam Sayed; Dr. Yasir Ahmad Khan; Dr. Waseem M.R. Siddiqui; Dr. Varsha Patil → now no doctor section (hidden on live).

## Assets

84 files downloaded from the live site into `public/images/live/` (kept under their live upload path); 34 images were already present locally and are reused.

- `/images/live/2024/04/bg23.jpg`
- `/images/live/2024/11/map.jpg`
- `/images/live/2026/05/Neurosurgery-612x518.jpg`
- `/images/live/2026/05/Orthopedics-612x518.jpg`
- `/images/live/2026/06/newimg1-1024x473.jpeg`
- `/images/live/2026/06/newimg25-1024x473.jpeg`
- `/images/live/2026/06/newimg38.jpeg`
- `/images/live/2026/06/newimg63.jpeg`
- `/images/live/2026/06/newimg69-1024x473.jpeg`
- `/images/live/2026/06/newimg75-612x518.jpeg`
- `/images/live/2026/09/Aesthetic-Medicine-1024x683.jpeg`
- `/images/live/2026/09/Antiaging-and-Wellness-1.jpg`
- `/images/live/2026/09/Antiaging-and-Wellness-1024x426.jpg`
- `/images/live/2026/09/Chemotherapy.webp`
- `/images/live/2026/09/DR.-RAFIQUE-ULLAH-KHAN.jpeg`
- `/images/live/2026/09/Dr-Nakul-Rathore.jpeg`
- `/images/live/2026/09/Dr-asma-kazi.jpeg`
- `/images/live/2026/09/Dr.-Mohd-Hamid-Ahmed.jpeg`
- `/images/live/2026/09/Dr.-Vrushali-Rane-Khan.jpeg`
- `/images/live/2026/09/ECMO.webp`
- `/images/live/2026/09/ENT-Surgery-612x518.jpeg`
- `/images/live/2026/09/Gramy-Hospita-172-612x518.jpg`
- `/images/live/2026/09/Gynaec-819x1024.jpeg`
- `/images/live/2026/09/HIPEC.webp`
- `/images/live/2026/09/LSUK8424-1024x683.jpg`
- `/images/live/2026/09/LVAD.webp`
- `/images/live/2026/09/Nephrology-e1790772781900-768x495.jpg`
- `/images/live/2026/09/Neuro-Surgery-612x518.jpeg`
- `/images/live/2026/09/Neurology-612x518.jpeg`
- `/images/live/2026/09/Onco-Surgery-1024x574.jpg`
- `/images/live/2026/09/Orthopedic-Surgery-612x518.jpeg`
- `/images/live/2026/09/Pain-Management-1024x518.jpeg`
- `/images/live/2026/09/Pathology-612x518.webp`
- `/images/live/2026/09/Plastic-Surgery-612x518.jpeg`
- `/images/live/2026/09/Robotic-Heart-Surgery.avif`
- `/images/live/2026/09/Sonography.webp`
- `/images/live/2026/09/Urology-612x518.jpeg`
- `/images/live/2026/09/bariatric-surgery.png`
- `/images/live/2026/09/bone-marror.jpg`
- `/images/live/2026/09/image_1adea37e-1.jpg`
- `/images/live/2026/09/image_226987a8-768x299.jpg`
- `/images/live/2026/09/image_24a73ee2.jpg`
- `/images/live/2026/09/image_2788a611.jpg`
- `/images/live/2026/09/image_40ff79fb.jpg`
- `/images/live/2026/09/image_4de6ff3b-1.jpg`
- `/images/live/2026/09/image_5388df10-1024x572.jpg`
- `/images/live/2026/09/image_65422bc5.jpg`
- `/images/live/2026/09/image_6851ecc8.jpg`
- `/images/live/2026/09/image_68b4c8c7.jpg`
- `/images/live/2026/09/image_6ca97f3f.jpg`
- `/images/live/2026/09/image_6d22357c.jpg`
- `/images/live/2026/09/image_6db4e1bf.jpg`
- `/images/live/2026/09/image_6fed632a.jpg`
- `/images/live/2026/09/image_73f5ab19.jpg`
- `/images/live/2026/09/image_7f3dbbe7-768x299.jpg`
- `/images/live/2026/09/image_84400b53.jpg`
- `/images/live/2026/09/image_8f61666d.jpg`
- `/images/live/2026/09/image_96a389ea.jpg`
- `/images/live/2026/09/image_99e1cf60.jpg`
- `/images/live/2026/09/image_9d427a39.jpg`
- `/images/live/2026/09/image_a984ec25-300x70.jpg`
- `/images/live/2026/09/image_b02010a7-e1790775882699-1024x497.jpg`
- `/images/live/2026/09/image_ba0f4631.jpg`
- `/images/live/2026/09/image_be7e09cf.jpg`
- `/images/live/2026/09/image_c76c7fa.jpg`
- `/images/live/2026/09/image_d1822fe2.jpg`
- `/images/live/2026/09/image_d4a5c34f.jpg`
- `/images/live/2026/09/image_d8a97538.jpg`
- `/images/live/2026/09/image_dae81f42-1.jpg`
- `/images/live/2026/09/image_e2d94d71.jpg`
- `/images/live/2026/09/image_e3d2e0d3.jpg`
- `/images/live/2026/09/image_e4d63159.jpg`
- `/images/live/2026/09/image_ea7e37ab-1-768x419.jpg`
- `/images/live/2026/09/image_fc32aa2.jpg`
- `/images/live/2026/09/image_fd5a4668.jpg`
- `/images/live/2026/09/knee-replacement.jpg`
- `/images/live/2026/09/laparoscopic-gramy-e1790773603587.webp`
- `/images/live/2026/09/nephrologist-612x415.jpg`
- `/images/live/2026/09/nephrologist.jpg`
- `/images/live/2026/09/orthopedic-surgery-612x518.jpg`
- `/images/live/2026/09/radiology2.webp`
- `/images/live/2026/09/robotic-surgery-1024x722.webp`
- `/images/live/2026/09/sonograph-2.jpg`
- `/images/live/2026/09/xray-pns.png`
