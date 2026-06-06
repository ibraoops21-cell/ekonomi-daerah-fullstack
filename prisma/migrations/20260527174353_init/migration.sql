-- CreateTable
CREATE TABLE "pdrb" (
    "id" SERIAL NOT NULL,
    "tahun" INTEGER NOT NULL,
    "kabupaten" TEXT NOT NULL,
    "sektor" TEXT NOT NULL,
    "nilai_pdrb" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "pdrb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kemiskinan" (
    "id" SERIAL NOT NULL,
    "tahun" INTEGER NOT NULL,
    "kabupaten" TEXT NOT NULL,
    "jumlah_miskin" INTEGER NOT NULL,
    "persentase" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "kemiskinan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengangguran" (
    "id" SERIAL NOT NULL,
    "tahun" INTEGER NOT NULL,
    "kabupaten" TEXT NOT NULL,
    "tingkat_tpt" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "pengangguran_pkey" PRIMARY KEY ("id")
);
