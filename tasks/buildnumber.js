/*
Copyright - 2021 - wwwouaiebe - Contact: https://www.ouaie.be/

This  program is free software;
you can redistribute it and/or modify it under the terms of the
GNU General Public License as published by the Free Software Foundation;
either version 3 of the License, or any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/
/*
Changes:
	- v0.0.1:
		- created
Doc reviewed 20220102
*/
/* ------------------------------------------------------------------------------------------------------------------------- */

'use strict';

module.exports = function ( grunt ) {
	grunt.task.registerMultiTask ( 
		'buildnumber', 
		'Adding the build number to the package.json', 
		function ( ) {
			let task = this.nameArgs.split ( ':' ).pop ( );
			let file = this.options ( ).file;
			let data = {};
			switch ( this.data.action ){
				case 'read' :
				case 'write' :
					if ( grunt.file.exists ( file ) ) {
						data = grunt.file.readJSON ( file );
					}
					this.data.values.forEach (
						value => {
							if ( value.name && value.name !== 'buildnumber' ) {
								data [ value.name ] = data [ value.name ] || value.initialValue;
								if ( null !== data [ value.name ] ) {
									if ( 'read' === this.data.action ) {
										if ( value.transform ) {
											grunt.config.set ( value.name, value.transform( data [ value.name ] ) );
										}
										else {
											grunt.config.set ( value.name, data [ value.name ] );
										}
									}
									else {
										if ( value.transform ) {
											data [ value.name ] = value.transform ( data [ value.name ] );
										}
									}
								}
							}
						}
					)
					if ( 'write' === this.data.action ) {
						grunt.file.write ( file, JSON.stringify ( data, null, 2 ) );
					}
					break;
				default :
					if ( this.data.action ) {
						grunt.fail.warn( 'grunt-buildnumber task ' + task + ' - Invalid action ' + this.data.action );
					}
					else {
						grunt.fail.warn( 'grunt-buildnumber task ' + task + ' - Action not defined' );
					}
					break;
			}
		}
	);
};

/* --- End of file --------------------------------------------------------------------------------------------------------- */