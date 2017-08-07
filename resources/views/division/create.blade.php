@extends ('layouts.master')

@section ('content')

<div class="container">

    <div class="row">

        <div class="col-md-12">

            <form method="POST" action="{{ route('division.create') }}">

                {{ csrf_field() }}

                <h1>Current division list:</h1>

                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="col-md-2">Division</th>
                                <th class="col-md-8 text-center">Tutor</th>
                                <th class="col-md-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($divisions as $division)
                            <tr>
                                <th class="col-md-2">{{ $division->name }}</th>
                                <th class="col-md-8 text-center table-tutor">{{ $division->tutor->name . ' ' . $division->tutor->surname }}</th>
                                <th class="col-md-2">
                                  <a class="btn btn-info btn-sm edit-division" href="{{ route('division.edit', $division->id) }}">Edit</a>
                                    <!-- <button role="button" class="btn btn-info btn-sm edit-division">Edit</button> -->
                                </th>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

                @if ($flash = session('message'))
                <div class="alert alert-success text-center" role="alert">
                    <strong>{{ $flash }}</strong> has been successfully added to division list.
                </div>
                @endif

                <hr>

                <h1>Add new division</h1>
                <div class="form-group">
                    <label for="division">Division name:</label>
                    <input type="text" class="form-control" id="division" name="division">
                </div>

                <div class="form-group">
                    <label for="tutor">Tutor:</label>
                    <select class="custom-select" name="tutor">
                        @foreach($tutors as $tutor)
                        <option value="{{ $tutor->id }}">
                            {{ $tutor->name . ' ' . $tutor->surname }}
                        </option>
                        @endforeach
                    </select>
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Add</button>
                </div>

                @include ('layouts.errors')
            </form>

        </div>
    </div>


</div>



@endsection