const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { chefs, bahans, reseps } = require('./data');

const schema = buildSchema(`
  type Chef {
    id: ID!
    nama: String!
    spesialisasi: String
    pengalaman: String
    rating: Float
    reseps: [Resep]
  }

  type Bahan {
    id: ID!
    nama: String!
    kategori: String
    satuan: String
    stok: Int
  }

  type BahanResep {
    bahan: Bahan
    jumlah: Int
  }

  type Resep {
    id: ID!
    nama: String!
    tingkatKesulitan: String
    waktuMasak: Int
    chef: Chef
    bahan: [BahanResep]
    langkah: [String]
  }

  type Query {
    chefs: [Chef]
    chef(id: ID!): Chef
    bahans: [Bahan]
    bahan(id: ID!): Bahan
    reseps: [Resep]
    resep(id: ID!): Resep
    searchResep(keyword: String!): [Resep]
  }

  type Mutation {
    tambahChef(
      nama: String!
      spesialisasi: String
      pengalaman: String
    ): Chef

    tambahBahan(
      nama: String!
      kategori: String
      satuan: String!
      stok: Int
    ): Bahan

    tambahResep(
      nama: String!
      tingkatKesulitan: String
      chefId: ID!
    ): Resep

    tambahBahanKeResep(
      resepId: ID!
      bahanId: ID!
      jumlah: Int!
    ): Resep
  }
`);

const root = {
  // Query Resolvers
  chefs: () => chefs,
  chef: ({id}) => chefs.find(c => c.id === id),
  bahans: () => bahans,
  bahan: ({id}) => bahans.find(b => b.id === id),
  reseps: () => reseps,
  resep: ({id}) => reseps.find(r => r.id === id),
  searchResep: ({keyword}) => 
    reseps.filter(r => r.nama.toLowerCase().includes(keyword.toLowerCase())),

  // Mutation Resolvers
  tambahChef: ({nama, spesialisasi, pengalaman}) => {
    const chef = {
      id: `c${chefs.length + 1}`,
      nama,
      spesialisasi,
      pengalaman,
      rating: 0
    };
    chefs.push(chef);
    return chef;
  },

  tambahBahan: ({nama, kategori, satuan, stok}) => {
    const bahan = {
      id: `b${bahans.length + 1}`,
      nama,
      kategori,
      satuan,
      stok: stok || 0
    };
    bahans.push(bahan);
    return bahan;
  },

  tambahResep: ({nama, tingkatKesulitan, chefId}) => {
    const resep = {
      id: `r${reseps.length + 1}`,
      nama,
      tingkatKesulitan,
      chefId,
      bahan: [],
      langkah: []
    };
    reseps.push(resep);
    return resep;
  },

  tambahBahanKeResep: ({resepId, bahanId, jumlah}) => {
    const resep = reseps.find(r => r.id === resepId);
    if (resep) {
      resep.bahan.push({ bahanId, jumlah });
      return resep;
    }
    throw new Error('Resep tidak ditemukan');
  },

  // Field Resolvers
  Chef: {
    reseps: (chef) => reseps.filter(r => r.chefId === chef.id)
  },
  Resep: {
    chef: (resep) => chefs.find(c => c.id === resep.chefId),
    bahan: (resep) => resep.bahan.map(b => ({
      bahan: bahans.find(x => x.id === b.bahanId),
      jumlah: b.jumlah
    }))
  }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server GraphQL berjalan di http://localhost:${PORT}/graphql`);
  console.log(`GraphiQL tersedia di http://localhost:${PORT}/graphql`);
});
