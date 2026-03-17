#include <stdio.h>
#include <stdlib.h>

#define N 2
#define M 3

void initialise(int *array);

int main(void) {
	int *two_d_array;

	two_d_array = malloc(sizeof(int) * N * M);

	if (two_d_array == NULL) {
		printf("ERROR: malloc failed.\n");
		exit(1);
	}

	initialise(two_d_array);

	return 0;
}

void initialise(int *array) {
	int i, j;

	for (i = 0; i < N; i++) {
		printf("In row: i*M = %d\n", i*M);
		for (j = 0; j < M; j++) {
			array[i*M + j] = 0;
			printf("In column: i*M = %d, j = %d, index = %d, address = %p \n", i*M, j, (i*M + j), (void *)&array[i*M + j]);
		}
	}	
}
