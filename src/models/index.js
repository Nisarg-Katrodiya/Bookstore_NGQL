const graphql = require('graphql');
const {Product} = require('./product.model');
const {User} = require('../models/user.model');
const {Cart} = require('../models/cart.model');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ( ) => ({
        id: { type: GraphQLID },
        image: { type: GraphQLString },
        name: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        user: {
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.user);
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        id: { type: GraphQLID },
        token: { type: GraphQLString },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            async resolve(parent, args){
                return await Product.find({user: parent.id});
            }
        }
    })
});

const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: ( ) => ({
        id: { type: GraphQLID },
        productId: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return User.find(parent.productId);
            }
        },
        quantity: { type: GraphQLInt },
        price: { type: GraphQLInt },
        total: { type: GraphQLInt }
    })
});

const CartType = new GraphQLObjectType({
    name: 'Cart',
    fields: ( ) => ({
        id: { type: GraphQLID },
        subTotal: { type: GraphQLInt },
        items: {
            type: new GraphQLList(ItemType),
            resolve(parent, args){
                console.log("🚀 ~ file: index.js ~ line 76 ~ resolve ~ parent", parent)
                return Product.find({ authorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Product.findById(args.id);
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return User.findById(args.id);
            }
        },
        cart: {
            type: CartType,
            // args: { id: { type: GraphQLID } },
            async resolve(parent, args){
                let data = await Cart.find();
                return data;
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Product.find({});
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        loginUser: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            async resolve(parent, args){
                let user = await User.findOne(args);
                const token = user.generateAuthToken();
                const createdUser =  user.toJSON();
                const returnData = {
                    token,
                    ...createdUser,
                };
                return token && returnData;
            }
        },
        addUser: {
            type: UserType,
            args: {
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                role: { type: GraphQLString },
            },
            async resolve(parent, args){
                let newUser = new User({
                    firstname: args.firstname,
                    lastname: args.lastname,
                    email: args.email,
                    password: args.password,
                    role: args.role || 'user',
                });
                const token = newUser.generateAuthToken();
                let createdUser = await newUser.save();
                createdUser = createdUser.toJSON();
                const returnData = {
                    token,
                    ...createdUser,
                };
                return returnData;
            }
        },
        addBook: {
            type: BookType,
            args: {
                image: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                category: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                price: { type: new GraphQLNonNull(GraphQLInt) },
                user: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args){
                let book = new Product({
                    image: args.image,
                    name: args.name,
                    category: args.category,
                    description: args.description,
                    price: args.price,
                    user: args.user
                });
                return book.save();
            }
        },
        addToCart: {
            type: BookType,
            args: {
                productId: { type: new GraphQLNonNull(GraphQLString) },
                quantity: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args){
                let book = new Product({
                    image: args.image,
                    name: args.name,
                    category: args.category,
                    description: args.description,
                    price: args.price,
                    user: args.user
                });
                return book.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});