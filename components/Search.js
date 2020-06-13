import React, { Component } from 'react'
import { StyleSheet, TextInput, Button, SafeAreaView, Text, FlatList, View, Alert, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem';
import * as apis from '../API/TMDBApi.js'
import axios from 'axios';

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.page = 0;
        this.total_pages = 0;
        this.search_film = '';
        this.state = {
            isLoding: false,
            films: []
        };
    }

    searchFilms = () => {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: []
        })

        this.handleClick();
    }

    handleClick = () => {
        if (this.search_film.length > 0) {
            this.setState({ isLoding: true })
            this.page = this.page + 1;
            axios.get('https://api.themoviedb.org/3/search/movie?api_key=b38e7e3875489e18bb8b0c94c742b9fc&language=fr&query=' + this.search_film + '&page=' + this.page)
                .then(res => {
                    const data = res.data;
                    this.page = data.page;
                    this.total_pages = data.total_pages;
                    data.total_results == 0 ? Alert.alert('Info', 'No movies found for this title') : this.setState({ films: [...this.state.films, ...data.results], isLoding: false });;
                });
        } else {
            Alert.alert('Error', 'You should enter a title');
        }
    }

    onChangeTitle = title => {
        this.search_film = title;
    }

    render() {
        const { films, isLoding } = this.state;
        return (
            <SafeAreaView style={styles.main_container}>
                <View style={styles.search_block}>
                    <TextInput onSubmitEditing={this.searchFilms} onChangeText={text => this.onChangeTitle(text)} style={styles.textinput} placeholder='Titre du film' />
                    <Button color="#7FB3D5" title='Rechercher' onPress={this.searchFilms} />
                </View>
                {isLoding && (
                    <View style={styles.loading_container}>
                        <ActivityIndicator size="large" color="#7FB3D5" />
                    </View>
                )}

                <FlatList
                    data={films}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <FilmItem getImageFromApi={apis.getImageFromApi} movie={item} />}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        console.log("searching page" + this.page);
                        if (this.page < this.total_pages) {
                            console.log(`page n${this.page}, total:${this.total_pages}`);
                            this.handleClick();
                        }

                    }}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    search_block: {
        flex: 0,
        marginTop: 50,
        padding: 10,
        flexDirection: 'row'
    },
    button: {
        flex: 1,
        color: '#000'
    },
    textinput: {
        marginLeft: 1,
        marginRight: 1,
        height: 40,
        flex: 3,
        borderColor: '#7FB3D5',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


